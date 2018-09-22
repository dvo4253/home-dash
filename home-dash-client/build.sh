USER_ID=docker

sudo adduser ${USER_ID}
sudo echo "${USER_ID}" | passwd --stdin ${USER_ID}
sudo usermod -aG wheel ${USER_ID}

sudo echo "%wheel  ALL=(ALL)       NOPASSWD: ALL" >> /etc/sudoers

mkdir -p /home/${USER_ID}/.ssh
for x in `ls /public_keys`
do
    PUBLIC_KEY=`sudo cat /public_keys/$x`
    echo "${PUBLIC_KEY} ${USER_ID}" >> /home/${USER_ID}/.ssh/authorized_keys
done


sudo chmod -R 600 /home/${USER_ID}/.ssh
sudo chmod 700 /home/${USER_ID}/.ssh
sudo chown -R ${USER_ID} /home/${USER_ID}/.ssh
sudo chgrp -R ${USER_ID} /home/${USER_ID}/.ssh

sudo systemctl restart sshd

sudo yum -y check-update

docker version
DOCKER_EXISTS=`echo $?`

if [ ${DOCKER_EXISTS} != 0 ]; then
	sudo curl -fsSL https://get.docker.com/ | sh
fi

sudo systemctl start docker

sudo usermod -aG docker $(whoami)

docker version

cd /app

docker build -t react16-ssr:latest .

sudo systemctl enable firewalld
sudo systemctl start firewalld
sudo firewall-cmd --zone=public --add-port=80/tcp --permanent
sudo firewall-cmd --reload

sudo iptables -t filter -F
sudo iptables -t filter -X
sudo systemctl restart docker

docker run -d -p 80:8000 react16-ssr:latest
