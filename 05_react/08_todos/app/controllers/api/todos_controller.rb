class Api::TodosController < Api::ApiController
  before_action :set_todo, only: [:show, :update, :destroy]

  # GET /todos
  def index
    @todos = current_user.todos

    render json: @todos, include: :tags
  end

  # GET /todos/1
  def show
    render json: @todo, include: :tags
  end

  # POST /todos
  def create
    @todo = current_user.todos.new(todo_params)

    if @todo.save
      render json: @todo, include: :tags, status: :created, location: api_todo_url(@todo)
    else
      render json: @todo.errors.full_messages, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /todos/1
  def update
    if @todo.update(todo_params)
      render json: @todo, include: :tags
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # DELETE /todos/1
  def destroy
    render json: @todo.destroy, include: :tags
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_todo
      @todo = current_user.todos.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def todo_params
      params.require(:todo).permit(:title, :body, :done, tag_names: [])
    end
end
