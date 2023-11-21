deploy:
	@cd docker; sh ./deploy-all.sh

echo:
	@cd docker; echo `pwd`