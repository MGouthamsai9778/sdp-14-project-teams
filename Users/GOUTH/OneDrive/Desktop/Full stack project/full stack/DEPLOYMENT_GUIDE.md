# Deployment Guide

## Deployment Architecture

```
┌─────────────────────────────────────────┐
│ Frontend (Netlify/Vercel)               │
│ React App on CDN                        │
└──────────────┬──────────────────────────┘
               │ HTTPS
               ▼
┌─────────────────────────────────────────┐
│ Backend (Heroku/AWS/DigitalOcean)       │
│ Node.js/Express API Server              │
└──────────────┬──────────────────────────┘
               │ Connection String
               ▼
┌─────────────────────────────────────────┐
│ MongoDB Atlas (Cloud Database)          │
│ Managed MongoDB Instance                │
└─────────────────────────────────────────┘
```

## Backend Deployment

### Option 1: Deploy to Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   cd backend
   heroku create your-app-name
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_atlas_uri
   heroku config:set JWT_SECRET=your_secret_key
   heroku config:set FRONTEND_URL=https://your-frontend-url.com
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

### Option 2: Deploy to AWS EC2

1. **Launch EC2 Instance**
   - Amazon Linux 2 or Ubuntu 20.04
   - Open ports 22, 80, 443, 5000

2. **Connect to Instance**
   ```bash
   ssh -i your-key.pem ec2-user@your-instance-ip
   ```

3. **Install Node.js and MongoDB**
   ```bash
   curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -
   sudo yum install -y nodejs
   sudo amazon-linux-extras install -y mongodb-org
   ```

4. **Clone and Setup**
   ```bash
   git clone your-repo-url
   cd backend
   npm install
   ```

5. **Create .env file**
   ```bash
   nano .env
   # Add your environment variables
   ```

6. **Use PM2 for Process Management**
   ```bash
   npm install -g pm2
   pm2 start src/server.js --name "lms-backend"
   pm2 startup
   pm2 save
   ```

7. **Setup Nginx Reverse Proxy**
   ```bash
   sudo amazon-linux-extras install -y nginx
   ```

   Create `/etc/nginx/conf.d/default.conf`:
   ```nginx
   server {
     listen 80;
     server_name your-domain.com;

     location / {
       proxy_pass http://localhost:5000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

   ```bash
   sudo systemctl start nginx
   sudo systemctl enable nginx
   ```

8. **Setup SSL with Let's Encrypt**
   ```bash
   sudo amazon-linux-extras install -y certbot
   sudo certbot certonly --standalone -d your-domain.com
   ```

### Option 3: Deploy to DigitalOcean

1. **Create Droplet**
   - OS: Ubuntu 20.04
   - Size: Basic ($5-15/month)

2. **SSH into Droplet**
   ```bash
   ssh root@your-droplet-ip
   ```

3. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Clone Repository**
   ```bash
   git clone your-repo-url
   cd backend
   npm install
   ```

5. **Setup MongoDB**
   ```bash
   sudo apt-get install -y mongodb
   sudo systemctl start mongodb
   sudo systemctl enable mongodb
   ```

6. **Deploy similar to AWS setup**

## MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free

2. **Create Cluster**
   - Choose free tier
   - Select region closest to your users

3. **Create Database User**
   - Set username and password
   - Take note of connection string

4. **Set Connection String in Environment**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/lms?retryWrites=true&w=majority
   ```

## Frontend Deployment

### Option 1: Deploy to Netlify

1. **Build Project**
   ```bash
   cd frontend
   npm run build
   ```

2. **Connect GitHub Repository**
   - Go to https://netlify.com
   - Click "New site from Git"
   - Select your repository
   - Deploy settings:
     - Build command: `npm run build`
     - Publish directory: `build`

3. **Set Environment Variables**
   - Go to Build & Deploy → Environment
   - Add `REACT_APP_API_URL` = your backend URL

4. **Deploy**
   - Push to GitHub main branch
   - Netlify automatically builds and deploys

### Option 2: Deploy to Vercel

1. **Connect GitHub Repository**
   - Go to https://vercel.com
   - Click "New Project"
   - Import GitHub repository

2. **Configure Project**
   - Framework: Create React App
   - Root directory: frontend

3. **Set Environment Variables**
   - Add `REACT_APP_API_URL` = your backend URL

4. **Deploy**
   - Click Deploy
   - Vercel automatically handles build and deployment

### Option 3: Deploy to AWS S3 + CloudFront

1. **Build Project**
   ```bash
   npm run build
   ```

2. **Create S3 Bucket**
   - Enable Static Website Hosting
   - Upload `build` folder contents

3. **Create CloudFront Distribution**
   - Point to S3 bucket
   - Set default root object to `index.html`

4. **Setup DNS**
   - Point your domain to CloudFront

## Domain and SSL Setup

### Add Custom Domain with SSL

1. **Register Domain**
   - Use GoDaddy, Namecheap, or Route53

2. **Update DNS Records**
   - Point to your hosting provider
   - Setup CNAME or A records

3. **Enable SSL Certificate**
   - Most providers offer free SSL
   - Use Let's Encrypt for manual servers

## Environment Variables for Production

### Backend (.env)
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/lms
JWT_SECRET=strong_secret_key_minimum_32_chars
JWT_EXPIRY=7d
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-domain.com
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-domain.com/api
```

## Monitoring and Logging

### Backend Monitoring
- Use PM2 Plus for process monitoring
- Setup error tracking with Sentry
- Monitor logs with CloudWatch or ELK stack

### Frontend Monitoring
- Setup error tracking
- Monitor performance with New Relic
- Track user behavior with Google Analytics

## Security Checklist

- [ ] Change all default passwords
- [ ] Enable HTTPS/SSL certificates
- [ ] Setup firewall rules
- [ ] Enable CORS only for frontend domain
- [ ] Use strong JWT secret
- [ ] Implement rate limiting
- [ ] Enable MongoDB authentication
- [ ] Regular security audits
- [ ] Setup backups for database
- [ ] Monitor error logs

## Database Backups

### MongoDB Atlas Automatic Backups
- Enable in Atlas settings
- Automatic daily snapshots
- 35-day retention

### Manual Backup
```bash
mongodump --uri "mongodb+srv://user:password@cluster.mongodb.net/lms" --out ./backup
```

## Performance Optimization

### Frontend
- Enable gzip compression
- Minify CSS and JavaScript
- Use CDN for assets
- Lazy load components
- Cache static files

### Backend
- Enable caching headers
- Use database indexing
- Implement pagination
- Monitor API response times
- Use load balancing for high traffic

## Scaling Considerations

### Horizontal Scaling
- Run multiple backend instances
- Use load balancer (AWS ALB, Nginx)
- Centralized session storage
- Separate database server

### Vertical Scaling
- Increase server resources
- Upgrade database tier
- Better CPU and RAM

### Database Scaling
- Use MongoDB sharding for large datasets
- Implement read replicas
- Optimize database queries
- Archive old data

## Troubleshooting Deployment

### Backend won't connect to database
- Verify connection string
- Check IP whitelist in MongoDB Atlas
- Ensure credentials are correct

### Frontend can't reach API
- Verify CORS configuration
- Check API URL in environment variables
- Ensure backend is running

### Slow performance
- Check database indexes
- Monitor API response times
- Review and optimize queries
- Consider caching strategies

## Cost Estimation (Monthly)

- **Frontend (Netlify/Vercel)**: $0-29 (free tier available)
- **Backend (Heroku/DigitalOcean)**: $5-50
- **Database (MongoDB Atlas)**: $0-100 (free tier available)
- **Domain**: $10-15/year
- **SSL Certificate**: Free (Let's Encrypt)

**Total**: $15-100/month depending on traffic and features

## Continuous Integration/Deployment

### GitHub Actions Example
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to Heroku
      run: |
        git push https://heroku:${{ secrets.HEROKU_API_KEY }}@git.heroku.com/${{ secrets.HEROKU_APP_NAME }}.git main
```

## Support and Documentation

- Backend logs: Check PM2 logs or application logs
- Frontend logs: Browser console
- Database logs: MongoDB Atlas monitoring
- Error tracking: Sentry or similar service
