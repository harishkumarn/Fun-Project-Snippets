#include<stdio.h>
#include<stdlib.h>
int main(){
    char arr[100];
    scanf("%s",arr);
    int len = strlen(arr);
    int countarr[26]={0};
    int maxocc=0;
    char maxoccrchar='\0';
    
    for(int i = 0 ;i < len ;++i){
        countarr[arr[i]-'a']++;
        if(countarr[arr[i]-'a'] > maxocc){
            maxocc=countarr[arr[i]-'a'] ;
            maxoccrchar=arr[i];
        }else if(countarr[arr[i]-'a'] == maxocc){
            if(maxoccrchar < arr[i]){
                maxoccrchar = arr[i];
            }
        }
    }
    printf("%c - %d", maxoccrchar,maxocc);
}
