package com.chip8.engine;


import com.chip8.peripherals.IOController;
import com.chip8.peripherals.input.Keypad;
import com.chip8.peripherals.output.Display;
import com.chip8.peripherals.output.Sound;

import com.chip8.disassembler.ByteCodeToASMConverter;

import com.chip8.rom.RomReader;

import java.io.IOException;
import java.util.Random;
import java.util.Stack;
public class Processor{

    IOController ioc = new IOController();
    Display display = ioc.getDisplay() ; 
    Keypad keyPad = ioc.getKeypad();
    Sound sound = new Sound();

    public int[] registers = new int[16];

    int programCounter = 0x200, programEnd = 0;
    int indexRegister = 0x00;
   
    public int[] memory = new int[1<<12];
    Stack<Integer> stack = new Stack<Integer>();

    ByteCodeToASMConverter asm = new ByteCodeToASMConverter(this);
    
    boolean soundFlag = false;
    int delayTimer = 0, soundTimer = 0 ;

    public static void main(String[] args) throws IOException, InterruptedException{
        

        Processor chip8 = new Processor();
        chip8.display.initSpriteData(chip8);
        //RomReader rr = new RomReader("/Users/harish-8433/Downloads/Roms/Pong_1p.ch8");
         //RomReader rr = new RomReader("/Users/harish-8433/Downloads/Roms/Animal_Race.ch8");
        // RomReader rr = new RomReader("/Users/harish-8433/Downloads/Roms/15_Puzzle.ch8");
       //  RomReader rr = new RomReader("/Users/harish-8433/Downloads/Roms/Astro_Dodge.ch8");
        //RomReader rr = new RomReader("/Users/harish-8433/Downloads/Roms/Kaleidoscope.ch8");
       // RomReader rr = new RomReader("/Users/harish-8433/Downloads/Roms/Rocket.ch8"); 
        // RomReader rr = new RomReader("/Users/harish-8433/Downloads/Roms/Tron.ch8");??
        RomReader rr = new RomReader("/Users/harish-8433/Downloads/Roms/UFO.ch8");// 
       // RomReader rr = new RomReader("/Users/harish-8433/Downloads/Roms/Vertical_Brix.ch8");??
      // RomReader rr = new RomReader("/Users/harish-8433/Downloads/Roms/Wipe_Off.ch8");
     // RomReader rr = new RomReader("/Users/harish-8433/Downloads/Roms/Tetris.ch8");??
   // RomReader rr = new RomReader("/Users/harish-8433/Downloads/Roms/IBM Logo.ch8");
    //RomReader rr = new RomReader("/Users/harish-8433/Downloads/Roms/Clock Program.ch8");
  // RomReader rr = new RomReader("/Users/harish-8433/Downloads/Roms/Life.ch8");
 //    RomReader rr = new RomReader("/Users/harish-8433/Downloads/Roms/Chip8_logoo.ch8");
        chip8.programEnd = rr.initMemory(chip8);
        chip8.interpret();
    }

    private void interpret() throws InterruptedException{
        Random random = new Random();
        int x;
        while(programCounter < programEnd){
            Integer  bl = memory[programCounter+1] ;
            Integer  bh = memory[programCounter];
            boolean incPc = true;
            int val;
            if(soundFlag ){
                if(soundTimer == 0 ){
                    sound.beep();
                    soundFlag = false;
                }else{
                    soundTimer--;
                }
            }
            if(delayTimer > 0){
                delayTimer --;
            }
           // System.out.printf("0x%03X 0x%04X\n", programCounter, (memory[programCounter] << 8) | memory[programCounter+ 1]);
           // Uncomment the line below to dissamble byte code
           // System.out.printf("0x%03X %s\n",programCounter,asm.getAsmFromByteCode(bh,bl));
            switch (bh & 0xF0) {
                case 0x00:
                    switch (bl & 0xFF) {
                        case 0xE0:
                        display.clearDisplay();
                        break;
                        case 0xEE:
                        programCounter = stack.pop();
                        incPc =  false;
                        break;
                    }
                break;
                case 0x10:
                    programCounter = ((bh & 0x0F) << 8 )  | bl;
                    incPc =  false;
                break;
                case 0x20:
                    stack.push(programCounter + 2);
                    programCounter = ((bh & 0x0F) << 8 )  | bl;
                    incPc =  false;
                break;
                case 0x30:
                    if(registers[bh & 0x0F] == bl) programCounter +=  2;
                break;
                case 0x40:
                    if(registers[bh & 0x0F] != bl) programCounter +=  2;
                break;
                case 0x50:
                    if(registers[bh & 0x0F] == registers[bl >> 4]) programCounter +=  2;
                break;
                case 0x60:
                    registers[bh & 0x0F] = bl;
                break;
                case 0x70:
                    registers[bh & 0x0F] += bl;
                break;
                case 0x80:
                    switch (bl & 0x0F) {
                        case 0x00:
                            registers[bh & 0x0F] = registers[bl >> 4];
                        break;
                        case 0x01:
                            registers[bh & 0x0F] = (byte) (registers[bh & 0x0F] | registers[bl >> 4]);
                        break;
                        case 0x02:
                            registers[bh & 0x0F] = (byte) (registers[bh & 0x0F] & registers[bl >> 4]);
                        break;
                        case 0x03:
                            registers[bh & 0x0F] = (byte) (registers[bh & 0x0F] ^ registers[bl >> 4]);
                        break;
                        case 0x04:
                            val = registers[bh & 0x0F] + registers[bl >> 4];
                            registers[0xF] = (byte) (val > 255 ? 0x1 : 0x0);
                            registers[bh & 0x0F] = (byte) (val & 0xFF);
                        break;
                        case 0x05:
                            val = registers[bh & 0x0F] - registers[bl >> 4];
                            registers[0xF] = (byte) (val < 0 ? 0x0 : 0x1);
                            registers[bh & 0x0F] = (byte) (val & 0xFF);
                        break;
                        case 0x06:
                            val = registers[bl >> 4] >> 1;
                            registers[0xF] = (byte) (registers[bl  >> 4] & 0x1);
                            registers[bh & 0x0F] = (byte) val;
                        break;
                        case 0x07:
                            val =  registers[bl >> 4] - registers[bh & 0x0F];
                            registers[0xF] = (byte) (val < 0 ? 0x0 : 0x1);
                            registers[bh & 0x0F] = (byte) (val & 0xFF);
                        break;
                        case 0x0E:
                            val = registers[bl >> 4] << 1;
                            registers[0xF] =(byte)((registers[bl >> 4] & 0x80) == 0x80  ? 1 : 0);
                            registers[bh & 0x0F] = (byte) (val & 0xFF) ;
                        break;
                    }
                break;
                case 0x90:
                    if(registers[bh & 0x0F] != registers[bl >> 4]) programCounter +=  2;
                break;
                case 0xA0:
                    indexRegister = ((bh & 0x0F) << 8 ) | bl;
                break;
                case 0xB0:
                    programCounter  = (((bh & 0x0F) << 8 ) | bl ) + registers[0];
                    incPc = false;
                break;
                case 0xC0:
                    registers[bh & 0x0F] = (byte) (random.nextInt(256) & bl);
                break;
                case 0xD0:
                int[] bytes = new int[bl & 0xf];
                for(int i = 0 ;i < bytes.length;++i){
                    bytes[i] = memory[indexRegister + i];
                }
                registers[0xF] = display.setSprite(registers[bh & 0x0F],registers[bl >> 4] , bytes);
                break;
                case 0xE0:
                    switch (bl & 0xFF) {
                    case 0x9E:
                        if( keyPad.getAsyncKey() == registers[bh & 0x0F]) programCounter +=  2;
                     break;
                    case 0xA1:
                        if( keyPad.getAsyncKey() != registers[bh & 0x0F]) programCounter +=  2;
                    break;
                    }
                break;
                case 0xF0:
                    switch (bl & 0xFF) {
                    case 0x07:
                        registers[bh & 0x0F] =  delayTimer;
                        break;
                    case 0x0A:
                        registers[bh & 0x0F] = keyPad.getSyncKey();
                        break;
                    case 0x15:
                        delayTimer = registers[bh & 0x0F];
                        break;
                    case 0x18:
                        soundTimer = registers[bh & 0x0F];
                        soundFlag = true;
                        break;
                    case 0x1E:
                        indexRegister += registers[bh & 0x0F];
                        break;
                    case 0x29:
                        indexRegister = Display.getSpriteAddress(registers[bh & 0x0F]);
                        break;
                    case 0x33:
                        val =  registers[bh & 0x0F];
                        memory[indexRegister + 2] = (byte) (val % 10);
                        val /= 10;
                        memory[indexRegister + 1] = (byte) (val % 10);
                        val /= 10;
                        memory[indexRegister] = (byte) (val % 10);
                        break;
                    case 0x55:
                        x = (bh & 0x0F);
                        for(int i = 0 ; i <= x;++i){
                            memory[indexRegister + i ] = registers[i] ;
                        }
                        indexRegister += x + 1;
                        break;
                    case 0x65:
                        x = (bh & 0x0F);
                        for(int i = 0 ; i <= x;++i){
                            registers[i] = memory[indexRegister + i ]  ;
                        }
                        indexRegister += x + 1;
                        break;
                    }
                break;
                default:
                break;
            }
            if(incPc) programCounter += 2;
            Thread.sleep(16, 666666);// 16.666666 ms delay equates to 60 cycles / minutes. Chip8's CPU speed is 60 Hz.
            //Thread.sleep(1, 666666);
        }
    }
}