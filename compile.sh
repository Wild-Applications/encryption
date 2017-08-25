docker build -t blueapp/encryption:0.0.2 . &&
kubectl scale --replicas=0 deployment deployment --namespace=encryption &&
kubectl scale --replicas=2 deployment deployment --namespace=encryption
