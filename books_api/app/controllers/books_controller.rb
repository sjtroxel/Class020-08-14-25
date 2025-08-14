class BooksController < ApplicationController
  before_action :authenticate_request
  before_action :set_book, only: [:show, :update, :destroy]

  def index
    books = Book.all
    render json: BookBlueprint.render(books)
  end

  def show
    render json: BookBlueprint.render(@book)
  end

  def create
    book = @current_user.books.new(book_params)
    if book.save
      render json: BookBlueprint.render(book), status: :created
    else
      render json: book.errors, status: :unprocessable_entity
    end
  end

  def update
    if @book.update(book_params)
      render json: BookBlueprint.render(@book), status: :ok
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @book.destroy
    head :ok
  end

  def my_books
    books = @current_user.books

    render json: BookBlueprint.render(books, view: :normal), status: :ok
  end

  private

  def set_book
    @book = @current_user.books.find_by(id: params[:id])
    return render json: { error: "Not Found" }, status: :not_found unless @book
  end

  def book_params
    params.require(:book).permit(:title, :author, :read, :cover_image)
  end
end