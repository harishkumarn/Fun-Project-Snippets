#include <stdio.h>
#include<stdlib.h>
int main()
{
   char arr[100];
   scanf("%s",arr);
   int len = strlen(arr);
   if(len & 1){
       int mid = len  >> 1 ;
       int i,midway=mid;
       for(int  k =  0  ;k<  len ;++k){
           if(k !=  mid){
                if(k > mid){
                    i = --midway;
                }else{
                    i=k;
                }
                
                    int  prespace =  mid - (  i % mid );
                    for(int j = 0 ;j <  prespace;j++){
                        printf("  ");
                    }
                    printf("%c ",arr[prespace]);
                    int space = 2*(i%mid) -1;
                    for(int j = 0  ;j  < space ;++j){
                        printf("  ");
                    }
                    if(space >0){
                        printf("%c ",arr[mid + (  i %  mid  ) ]);
                    }
               
           }else{
                printf("%c ",arr[0 ]);
                int space = 2*mid -1;
                for(int j = 0  ;j  < space ;++j){
                    printf("  ");
                }
                printf("%c ",arr[len-1 ]);
           }
           printf("\n");
       }
   }else{
       printf("Not possible");
   }
   return  69;
}

