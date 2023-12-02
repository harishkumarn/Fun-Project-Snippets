#include <iostream>
using namespace std;
#define mod(a) a % 1000000007
int main() {
	int t;
	cin>>t;
	while(t--){
	    int an=3,bn=1,cn=3;
//	    cin>>an>>bn>>cn;
//	    int* a=new int[an];
//	    int* b=new int[bn];
//	    int* c=new int[cn];
        int a[]={1,2,3},b[]={5},c[]={4,5,6};
//	    for(int i=0;i<an;++i){
//	        cin>>a[i];
//	    }
//	    for(int i=0;i<bn;++i){
//	        cin>>b[i];
//	    }
//	    for(int i=0;i<cn;++i){
//	        cin>>c[i];
//	    }
	    int sum=0;
	    for(int i=0;i<an;++i){
	        for(int j=0;j<bn;j++){
	            if(a[i] <=b[j]){
	                for(int k=0;k<cn;k++){
	                    if(b[j]>=c[k]){
                            int  sm=mod( mod( mod(a[i])  + mod(b[j]) )  * mod( mod(c[k])  + mod(b[j]) ) );
	                        sum=mod(sum+sm);
                            cout<<mod(mod(a[i])  + mod(b[j]))*mod(mod(c[k])  + mod(b[j]) )<<endl;
	                    }
	                }
	            }
	        }
	    }
	    cout<<sum<<endl;
	}
	
	return 0;
}

