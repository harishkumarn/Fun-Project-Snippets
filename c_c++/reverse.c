#include<stdio.h>

int main(int argc, char * argv[]){
if(!argc && !argv){
	printf("The reversed number is : ");
}else if(!argv){
	int c=getchar();
	main(--argc,argv);
	putchar(c);
}else{
	printf("Enter a 5 digit number : ");
	fflush(stdout);
	main(5,NULL);
	putchar('\n');
}

}
