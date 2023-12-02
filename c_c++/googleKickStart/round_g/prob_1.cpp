#include<iostream>

using namespace std;

int main(){
    int t;
    cin>>t;
    for(int _case=1;_case <= t;_case++){
        string ans="YES";
        long long int n,d,c,m;
        cin>>n>>d>>c>>m;
        char* seq = new char[n];
        int dogcount=0;
        for(int  i=0;i<n;++i){
            cin>>seq[i];
            if(seq[i] == 'D'){
                dogcount++;
            }
        }
        for(int  i=0;i<n;++i){
            if(seq[i]=='D'){
                if(d > 0){
                    --d;
                    --dogcount;
                    c+=m;
                }else{
                    ans="NO";
                    break;
                }
            }else{
                if(c >0){
                    --c;
                }else {
                    if(dogcount >0 ){
                        ans="NO";
                    }
                    break;
                }
            }
        }
        cout<<"case #"<<_case<<": "<<ans<<endl;
    }
    return 0;
}
