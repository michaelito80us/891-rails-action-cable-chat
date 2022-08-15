class MessagesController < ApplicationController
  def create
    @chatroom = Chatroom.find(params[:chatroom_id])
    # we need the message
    @message = Message.create(message_params)

    # we need the user
      @message.user = current_user
    # we need the chatroom
      @message.chatroom = @chatroom

    if @message.save
      ChatroomChannel.broadcast_to(
        @chatroom,
        # "i am sending you the data"
        render_to_string(partial: "message", locals: {message: @message})
  )
  head :ok
    else
      render "chatrooms/show", status: :unprocessable_entity
    end
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end

end
