docker_push dp:
	@echo "[docker_push] prepare push to docker hub..."
	@docker build -t acid-backend .
	@docker tag acid-backend cagodoy/acid-backend:0.0.2
	@docker push cagodoy/acid-backend:0.0.2

.PHONY: docker_push