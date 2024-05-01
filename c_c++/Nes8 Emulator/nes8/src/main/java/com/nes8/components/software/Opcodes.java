package com.nes8.components.software;

import java.util.HashMap;

import com.nes8.components.CPU;
import com.nes8.components.CPU.Flag;

public class Opcodes {
    HashMap<Integer, Opcode> opcodes  = new HashMap<Integer, Opcode>();

    final CPU cpu ;

    public Opcodes(CPU cpu){
        this.cpu = cpu;
        initOpcodes();
    }

    private void updateADCFlags(byte a, byte o, byte c){
        cpu.updateFlag(Flag.C, (a + o + c) > 255);
        cpu.updateFlag(Flag.Z, ((a + o + c) & 0xFF) == 0);
        cpu.updateFlag(Flag.N, ((a + o + c) & 0x80) > 0 );
        cpu.updateFlag(Flag.V, ((~(a ^ o) & (a ^ (a + o + c))) & 0x0080)  > 0 );
    } 

    private void initOpcodes(){
        // ADD
        opcodes.put(0x69, new Opcode((byte)2,(byte)2, cpu){
            @Override
            public byte execute(){
                byte operand = cpu.bus.getByteCode(cpu.programCounter++);
                int temp = cpu.accumulator + operand  + cpu.getFlag(Flag.C);
                updateADCFlags(cpu.accumulator, operand , cpu.getFlag(Flag.C));
                cpu.accumulator = (byte)(temp & 0xFF);
                System.out.println("ADC #"+ Integer.toHexString(operand));
                return (byte)cycle;
            }
        });
        opcodes.put(0x65, new Opcode((byte)2,(byte)3, cpu){
            // Zero page
            @Override
            public byte execute(){
                byte operand = cpu.bus.getByteCode(cpu.programCounter++);
                int temp = cpu.accumulator + cpu.bus.cpuRead(operand) +  cpu.getFlag(Flag.C);
                updateADCFlags(cpu.accumulator,cpu.bus.cpuRead(operand), cpu.getFlag(Flag.C));
                cpu.accumulator = (byte)(temp & 0xFF);
                System.out.println("ADC "+ Integer.toHexString(operand));
                return (byte)cycle;
            }
        });
        opcodes.put(0x75,new Opcode((byte)2,(byte)4, cpu){
            @Override
            public byte execute(){
                byte operand = cpu.bus.getByteCode(cpu.programCounter++);
                int temp = cpu.accumulator + cpu.bus.cpuRead(operand + cpu.indexX) +  cpu.getFlag(Flag.C);
                updateADCFlags(cpu.accumulator, cpu.bus.cpuRead(operand + cpu.indexX), cpu.getFlag(Flag.C));
                cpu.accumulator = (byte)(temp & 0xFF);
                System.out.println("ADC "+ Integer.toHexString(operand) + " ,X");
                return (byte)cycle;
            }
        });
        opcodes.put(0x6D,new Opcode((byte)3,(byte)4, cpu){
            @Override
            public byte execute(){
                byte operand1 = cpu.bus.getByteCode(cpu.programCounter++);
                byte operand2 = cpu.bus.getByteCode(cpu.programCounter++);
                int temp = cpu.accumulator + cpu.bus.cpuRead( (operand1 << 8 ) + operand2) +  cpu.getFlag(Flag.C);
                updateADCFlags(cpu.accumulator,cpu.bus.cpuRead( (operand1 << 8 ) + operand2) , cpu.getFlag(Flag.C));
                cpu.accumulator = (byte)(temp & 0xFF);
                System.out.println("ADC "+ Integer.toHexString((operand1 << 8 ) + operand2) );
                return (byte)cycle;
            }
        });
        opcodes.put(0x7D,new Opcode((byte)3,(byte)4, cpu){
            @Override
            public byte execute(){
                byte operand1 = cpu.bus.getByteCode(cpu.programCounter++);
                byte operand2 = cpu.bus.getByteCode(cpu.programCounter++);
                int temp = cpu.accumulator + cpu.bus.cpuRead( (operand1 << 8 ) + operand2 + cpu.indexX) +  cpu.getFlag(Flag.C);
                updateADCFlags(cpu.accumulator, cpu.bus.cpuRead( (operand1 << 8 ) + operand2 + cpu.indexX), cpu.getFlag(Flag.C));
                cpu.accumulator = (byte)(temp & 0xFF);
                System.out.println("ADC "+ Integer.toHexString((operand1 << 8 ) + operand2) + " ,X" );
                return (byte)cycle;
            }
        });
        opcodes.put(0x79,new Opcode((byte)3,(byte)4, cpu){
            @Override
            public byte execute(){
                byte operand1 = cpu.bus.getByteCode(cpu.programCounter++);
                byte operand2 = cpu.bus.getByteCode(cpu.programCounter++);
                int temp = cpu.accumulator + cpu.bus.cpuRead( (operand1 << 8 ) + operand2 + cpu.indexY) +  cpu.getFlag(Flag.C);
                updateADCFlags(cpu.accumulator,cpu.bus.cpuRead( (operand1 << 8 ) + operand2 + cpu.indexY)  , cpu.getFlag(Flag.C));
                cpu.accumulator = (byte)(temp & 0xFF);
                System.out.println("ADC "+ Integer.toHexString((operand1 << 8 ) + operand2) + " ,Y" );
                return (byte)cycle;
            }
        });
        opcodes.put(0x61,new Opcode((byte)2,(byte)6, cpu){
            @Override
            public byte execute(){
                byte operand = cpu.bus.getByteCode(cpu.programCounter++);
                int address = (cpu.bus.cpuRead(operand + 1) << 8 )  + cpu.bus.cpuRead(operand );
                int temp = cpu.accumulator + cpu.bus.cpuRead(address ) +  cpu.getFlag(Flag.C);
                updateADCFlags(cpu.accumulator, cpu.bus.cpuRead(address ), cpu.getFlag(Flag.C));
                cpu.accumulator = (byte)(temp & 0xFF);
                System.out.println("ADC ("+ Integer.toHexString(operand) + " ,X)" );
                return (byte)cycle;
            }
        });
        opcodes.put(0x71,new Opcode((byte)2,(byte)5, cpu){
            @Override
            public byte execute(){
                byte operand = cpu.bus.getByteCode(cpu.programCounter++);
                int address = (cpu.bus.cpuRead(operand + 1) << 8 )  + cpu.bus.cpuRead(operand ) +  cpu.indexY;
                int temp = cpu.accumulator + cpu.bus.cpuRead(address ) +  cpu.getFlag(Flag.C);
                updateADCFlags(cpu.accumulator,cpu.bus.cpuRead(address ) , cpu.getFlag(Flag.C));
                cpu.accumulator = (byte)(temp & 0xFF);
                System.out.println("ADC ("+ Integer.toHexString(operand) + ") ,Y" );
                return (byte)cycle;
            }
        });
    }

}