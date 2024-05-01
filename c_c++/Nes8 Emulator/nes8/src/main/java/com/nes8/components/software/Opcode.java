package com.nes8.components.software;

import com.nes8.components.CPU;


public class Opcode {
    byte bytes, cycle;
    CPU cpu ;
    public Opcode(byte bytes, byte cycle, CPU cpu){
        this.bytes = bytes;
        this.cycle = cycle;
        this.cpu = cpu;
    }
    public byte execute(){
        return cycle;
    }
} 