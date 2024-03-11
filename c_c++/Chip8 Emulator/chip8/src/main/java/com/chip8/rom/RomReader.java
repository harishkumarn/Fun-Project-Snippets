package com.chip8.rom;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.BufferedInputStream;

import com.chip8.engine.Processor;

public class RomReader {
    BufferedInputStream br = null;
    public RomReader(String romPath)  throws IOException{
        initStream(romPath);
    }

    private void initStream(String file) throws IOException{
        br = new BufferedInputStream(new FileInputStream(new File(file)));
    } 

    public int initMemory(Processor chip8) throws IOException{
        int address = 0x200 ;
        try{
            int readByte = 0 ;
            while((readByte = br.read()) != -1){
                chip8.memory[address ++] = readByte;
            }
        }catch(Exception e){
            System.err.println(e);
        }finally{
            br.close();
        }
        return address;
    }


}
