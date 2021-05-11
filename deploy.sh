# Build docker images
# We use 2 tag --> 1.latest 2.latest git commit SHA which is stored as .env variable in travis.yml file

docker build -t orhanors/linkedin-client:latest -t orhanors/linkedin-client:$SHA -f ./frontend/Dockerfile ./frontend
docker build -t orhanors/linkedin-server:latest -t orhanors/linkedin-server:$SHA -f ./backend/Dockerfile ./backend

#Push images to docker hub
docker push orhanors/linkedin-client:latest
docker push orhanors/linkedin-client:$SHA

docker push orhanors/linkedin-server:latest
docker push orhanors/linkedin-server:$SHA

#create namespace
kubectl create namespace linkedin
#Apply kubectl
kubectl apply -f k8s

#Set new image to deployments
#If we push new image kubernetes will be using latest image that we pushed

kubectl set image deployments/li-client-deployment client=orhanors/linkedin-client:$SHA -n linkedin
kubectl set image deployments/li-server-deployment server=orhanors/linkedin-server:$SHA -n linkedin