/******************************************************************************

                            Online C Compiler.
                Code, Compile, Run and Debug C program online.
Write your code in this editor and press "Run" button to compile and execute it.

*******************************************************************************/

#include <stdio.h>
#include<stdlib.h>
int main()
{
   int n ;
   scanf("%d",&n);
   int itr = n*(n+1)/2;
 
  int** grid = (int**)calloc(n,sizeof(int*));
  for(int i =0;i<n;++i){
      grid[i] = (int*)calloc(n,sizeof(int));
  }
    
   int  i =-1,j=-1,action=0,num=1,actionItr=0,actionTarget=n;
   for(int k  =  0  ;k <  itr ; k++){
       actionItr++;
       switch(action % 3){
           case 1:
           grid[--i][j]=num++;
           break;
           case 2:
           grid[i][--j]=num++;
           break;
           case 0:
           grid[++i][++j]=num++;
           break;
       }
       if(actionItr  == actionTarget){
            actionTarget--;
            actionItr=0;
            action++;
       }
   }
   for(int i =0 ;i<n;++i){
       for(int j =0 ;j<i;++j){
           printf("  ");
       }
       for(int j =i ;j<n;++j){
            printf("%d ",grid[i][j]);
       }
       printf("\n");
   }
   return  0;
}

