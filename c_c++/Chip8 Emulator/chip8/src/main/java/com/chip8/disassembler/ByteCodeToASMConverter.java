package com.chip8.disassembler;

import com.chip8.engine.Processor;

public class ByteCodeToASMConverter{
    Processor chip8;
    public ByteCodeToASMConverter(Processor chip8){
        this.chip8 = chip8;
    }
    public  String getAsmFromByteCode(Integer bh, Integer bl){
        switch (bh & 0xF0) {
                case 0x00:
                    switch (bl & 0xFF) {
                        case 0xE0:
                        return "CLD";
                        case 0xEE:
                        return "RET";
                    }
                break;
                case 0x10:
                    return  "JMP 0X" + Integer.toHexString(((bh & 0x0F) << 8 )  | bl); 
                case 0x20:
                    return  "CALL 0x" + Integer.toHexString(((bh & 0x0F) << 8 )  | bl); 
                case 0x30:
                    return  "SKPE V" + Integer.toHexString(chip8.registers[bh & 0x0F]) + " , " + Integer.toHexString(bl); 
                case 0x40:
                    return  "SKPNE V" + Integer.toHexString(chip8.registers[bh & 0x0F]) + " , " + Integer.toHexString(bl); 
                case 0x50:
                    return  "SKPE V" + Integer.toHexString(chip8.registers[bh & 0x0F]) + " , V" + Integer.toHexString(bl >> 4); 
                case 0x60:
                    return "MOV V" + Integer.toHexString(chip8.registers[bh & 0x0F]) + " , " + Integer.toHexString(bl);
                case 0x70:
                    return "ADD V" + Integer.toHexString(chip8.registers[bh & 0x0F]) + " , " + Integer.toHexString(bl);
                case 0x80:
                    switch (bl & 0x0F) {
                        case 0x00:
                            return "LD V" + Integer.toHexString(chip8.registers[bh & 0x0F]) + " , V" + Integer.toHexString(bl >> 4);
                        case 0x01:
                            return "OR V" + Integer.toHexString(chip8.registers[bh & 0x0F]) + " , V" + Integer.toHexString(bl >> 4);
                        case 0x02:
                            return "AND V" + Integer.toHexString(chip8.registers[bh & 0x0F]) + " , V" + Integer.toHexString(bl >> 4);
                        case 0x03:
                            return "XOR V" + Integer.toHexString(chip8.registers[bh & 0x0F]) + " , V" + Integer.toHexString(bl >> 4);
                        case 0x04:
                            return "ADD V" + Integer.toHexString(chip8.registers[bh & 0x0F]) + " , V" + Integer.toHexString(bl >> 4);
                        case 0x05:
                            return "SUB V" + Integer.toHexString(chip8.registers[bh & 0x0F]) + " , V" + Integer.toHexString(bl >> 4);
                        case 0x06:
                            return "MOV V" + Integer.toHexString(chip8.registers[bh & 0x0F]) + " , V" + Integer.toHexString(bl >> 4) + " >> 1";
                        case 0x07:
                             return "MOV V" + Integer.toHexString(chip8.registers[bh & 0x0F]) + " , V" + Integer.toHexString(bl >> 4) + " - V" + Integer.toHexString(chip8.registers[bh & 0x0F]);
                        case 0x0E:
                        return "MOV V" + Integer.toHexString(chip8.registers[bh & 0x0F]) + " , V" + Integer.toHexString(bl >> 4) + " << 1";
                    }
                break;
                case 0x90:
                    return  "SKPNE V" + Integer.toHexString(chip8.registers[bh & 0x0F]) + " , V" + Integer.toHexString(bl >> 4); 
                case 0xA0:
                    return "MOV I ," + Integer.toHexString( ((bh & 0x0F) << 8 ) | bl) ;
                case 0xB0:
                    return "JMP " + Integer.toHexString((((bh & 0x0F) << 8 ) | bl ) + chip8.registers[0]);
                case 0xC0:
                    return "MOV V" + Integer.toHexString(chip8.registers[bh & 0x0F]) + " , rand() & " + Integer.toHexString(bl);
                case 0xD0:
                return "DRW " + Integer.toHexString(chip8.registers[bh & 0x0F]) +  " , " + Integer.toHexString(chip8.registers[bl >> 4]) + " , " + Integer.toHexString(bl & 0xf);
                case 0xE0:
                    switch (bl & 0xFF) {
                    case 0x9E:
                        return "SKPE V" + Integer.toHexString( chip8.registers[bh & 0x0F]) + " , keypressed()";
                    case 0xA1:
                        return "SKPNE V" + Integer.toHexString( chip8.registers[bh & 0x0F]) + " , keypressed()";
                    }
                break;
                case 0xF0:
                    switch (bl & 0xFF) {
                    case 0x07:
                        return "MOV V" + Integer.toHexString( chip8.registers[bh & 0x0F]) + " , DELAY";
                    case 0x0A:
                        return "MOV V" + Integer.toHexString( chip8.registers[bh & 0x0F]) + " , presskey()";
                    case 0x15:
                        return "MOV DELAY, V" + Integer.toHexString( chip8.registers[bh & 0x0F]);
                    case 0x18:
                        return "MOV SOUND, V" + Integer.toHexString( chip8.registers[bh & 0x0F]);
                    case 0x1E:
                        return "MOV I,  V" +  Integer.toHexString( chip8.registers[bh & 0x0F] ); 
                    case 0x29:
                        return "MOV I, SPRITE( V" +  Integer.toHexString( chip8.registers[bh & 0x0F] )+ ")"; 
                    case 0x33:
                        return "MOV I, BCD( V" +  Integer.toHexString( chip8.registers[bh & 0x0F] )+ ")"; 
                    case 0x55:
                        return "MOVB SI, V0\nMOV DI, I\nMOVB";
                    case 0x65:
                        return "MOVB SI, I\nMOV DI, V0\nMOVB";
                    }
                break;
                default:
                break;
            }
        return null;
    }
}