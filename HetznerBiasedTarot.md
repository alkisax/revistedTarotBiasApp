cd /var/www
mkdir biased-tarot
cd biased-tarot
git clone git@github.com:alkisax/revistedTarotBiasApp.git .
cd /var/www/biased-tarot/frontend
npm install
nano .env
npm run build
cd ../backend
npm install
nano .env
pm2 start server.js --name biased-tarot
pm2 save