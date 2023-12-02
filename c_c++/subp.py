import  subprocess

a = subprocess.run('ls -la',capture_output=True,shell=True)

print(a.stdout.decode())
