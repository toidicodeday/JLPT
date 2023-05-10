
REGISTRY = git.hisoft.com.vn:5050
GROUP = lien-minh-xe-tai
IMAGE_NAME = web-admin
IMAGE = ${REGISTRY}/${GROUP}/${IMAGE_NAME}
TAG = latest

dev:
	docker build --platform=linux/amd64 -t ${IMAGE}:${TAG} .
	docker push ${IMAGE}:${TAG}
	docker image prune -f