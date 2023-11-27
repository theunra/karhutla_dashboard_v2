// import {requestServer} from '../services/mqttHandler'
import socket_handler from './SocketHandler.js';
/**
 * Variable contains serial port selected 
 */
let port
/**
 * Serial port reader. Read byte data from port.
 */
let reader
/**
 * Variable to store chunks/bytes of data from reader.
 */
let serialdata=""
/**
 * Sets of complete chunks/bytes of data.
 */
let decodeddata=[]
/**
 * True if current reader is locked to a port.
 */
let readerLock=false

const serialHandler = {
    connected : false,

    async GetData(){
        try{
            while(port.readable)
            {
                try{
                    try{
                        if(!readerLock) 
                        {
                            reader = port.readable.getReader()
                            readerLock = true
                        }
                    }
                    catch(err)
                    {
                        console.log(err)
                        if(err.name=="TypeError") {
                            reader.releaseLock()
                            readerLock = false
                            this.connected=false
                        }
                    }

                    while(true){
                        const {value,done} = await reader.read()
                        if(value)
                        {
                            this.connected=true
                            const chunkdata = String.fromCharCode(...value);
                            if(value!==undefined) serialdata += chunkdata
                            // decodeddata = serialdata.split('#')
                            // serialdata = decodeddata.pop()
                            // console.log(serialdata)
                            //strip from alphabet
                            // if(serialdata.search('#') >= 0){
                            //     console.log(serialdata.toString())
                            //     console.log("pppppppppppppppppppppppppppppp");
                            // }
                            
                            // console.log(serialdata)
                            
                            if(serialdata.length>0 && serialdata.search('#') >= 0) {
                                serialdata = serialdata.replace(/[^\d,.^\n^\-]/g,"");
                                console.log(serialdata.toString())
                                const payload = {
                                    id : 'serialdata',
                                    data : serialdata.toString()
                                }
                                // requestServer('backend/request',JSON.stringify(payload))
                                socket_handler.sendSerialData(payload)
                                serialdata = ''
                            }
                            break;
                        }
                        else if(done)
                        {
                            console.log("Serial Done")
                            reader.releaseLock();
                            serialdata = ""
                            break
                        }
                        else{
                            serialdata = "";   
                        }
                    }
                }
                catch(err)
                {
                    console.log("Read serial error,",err)
                    break;
                }
            }
        }
        catch(err){
            console.log("Get serial data error,",err)
        }
    },

    async ListenSerial(BAUDRATE){
        try{
            console.log(BAUDRATE);
            await port.open({baudRate : BAUDRATE})
        }
        catch(err){
            console.log("Listen serial error,",err)
        }
    },
    
    /**
     * @returns true if current browser support serial port access.
     */
    isSupported()
    {
        if('serial' in window.navigator) return true;
        else return false;
    },

    /**
     * @returns true if serial port connected and is receiving data.
     */
    isConnected()
    {
        return this.connected;
    },

    /**
     * Request serial port to listen and retrive data.
     * Will open prompt to select serial port and get permission from user
     * to access the port from web app.
     * @param port access given serial port
     * @param baudrate port baudrate
     * @returns (err) if error found
     */
    async RequestSerial(baudrate){
        try{
            /**
            * Get serial port and request permission from user
            */
            port = await navigator.serial.requestPort()
            /**
            * Open selected port and listen to serial
            */
            await serialHandler.ListenSerial(57600)
            /**
            * Read serial data, then send data to backend
            */
            await serialHandler.GetData()
            return true
        }
        catch(err){
            console.log(err)
            throw err
        }
    },
}


export default serialHandler