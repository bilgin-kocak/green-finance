# Description: This script will start the backend API as a systemd service
create_service_file () {
  sudo rm -f backend.service
  echo "[Unit]">>backend.service
  echo "Description=Backend API systemd service">>backend.service
  echo "StartLimitIntervalSec=0">>backend.service
  echo "[Service]">>backend.service
  echo "Type=simple">>backend.service
#   echo "User=$(whoami)">>backend.service
  echo "WorkingDirectory=$HOME/climate-finance/">>backend.service
  echo "ExecStart=/home/admin/.nvm/versions/node/v18.20.3/bin/node ./backend/app.js">>backend.service
  echo "Restart=always">>backend.service
  echo "RestartSec=1">>backend.service
  echo "[Install]">>backend.service
  echo "WantedBy=default.target">>backend.service
  echo "">>backend.service
}

remove_service_file () {
if test -f "/etc/systemd/system/backend.service"; then
    sudo systemctl stop backend
    sudo systemctl disable backend
    sudo rm /etc/systemd/system/backend.service
  fi
}

npm install

remove_service_file
create_service_file
sudo chmod 644 backend.service
sudo cp -f backend.service /etc/systemd/system/backend.service
sudo systemctl daemon-reload
sudo systemctl start backend
sudo systemctl enable backend