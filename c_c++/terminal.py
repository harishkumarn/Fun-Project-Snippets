import sys
import subprocess

cmds = ['psql -U harish-8433', r'\c sasdb']

p = subprocess.Popen(cmd=tuple([item for item in cmds]),
                     stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
