#include<iostream>
#include<vector>
#define min(a,b) a<b ? a : b
using namespace std;
int lefti,righti,binindex=0;
vector<int> binindices;
void getnextrange(){
    lefti=righti;
    if(binindex <  binindices.size()){
        righti=binindices[binindex++];
    }else{
        righti=6000000;
    }
}
int main(){
    int t;
    cin>>t;
    for(int case_ = 1;  case_ <= t;case_++){
        
        long long int ans=0;
        binindex=0;
        binindices.clear();
        int houses;
        string bins;
        cin>>houses;
        cin>>bins;
        for(int i=0;i<houses;i++){
            if(bins[i]  == '1'){
                binindices.push_back(i);
            }
        }
        if(binindices[0] != 0){
            lefti=-6000000;
            righti=binindices[binindex++];
        }else{
            lefti=binindices[binindex++];
            if(binindices.size()>1){
                righti=binindices[binindex++];
            }else{
                righti = 6000000;
            }
        }
        
        for(int i=0;i<houses;i++){
            if(i > righti){
                getnextrange();
            }
            
            if(bins[i]  == '0'){
                int val = min(abs(i-lefti),abs(righti-i));
                ans+=val;
            }
        }
        cout<<"Case #"<<case_<<":  "<<ans<<endl;
    }
}
