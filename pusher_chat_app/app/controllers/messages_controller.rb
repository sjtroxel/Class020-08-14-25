class MessagesController < ApplicationController
  def index
    messages = Message.all
    render json: messages
  end

  def create
    message = Message.new(message_params)

    if message.save
      Pusher.trigger('chat', 'new_message', message.as_json)
      render json: message, status: :created
    else
      render json: message.errors, status: :unprocessable_entity
    end
  end

  private

  def message_params
    params.permit(:content)
  end
end
