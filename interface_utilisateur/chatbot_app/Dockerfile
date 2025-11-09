FROM rasa/rasa:3.6.14

WORKDIR /app

COPY rasa_project .

USER root

# Install pymongo so Rasa can use Mongo tracker store
RUN pip install --no-cache-dir pymongo==4.4.0

# RUN rasa train (désactivé lors du build pour éviter les erreurs de validation du domain)
# Vous pouvez entraîner le modèle ensuite avec : docker compose run rasa rasa train

USER 1001

EXPOSE 5005

CMD ["run", "--enable-api", "--cors", "*"]