require "rails_helper"

RSpec.describe "books", type: :request do
  let(:expected_book_structure) do
    {
      "id"=> Integer,
      "title" => String,
      "author" => String,
      "read" => [TrueClass, FalseClass],
    }
  end

  describe "GET /index" do
    before do
      create_list(:book, 10)
      get "/books"
      @body = JSON.parse(response.body)
    end

    it "returns books" do
      @body.each do |book|
        expect(book.keys).to contain_exactly(*expected_book_structure.keys)
      end
    end

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it 'does not return empty if books exist' do
      expect(@body).not_to be_empty
    end

    it 'returns 10 books' do
      expect(@body.size).to eq(10)
    end
  end

  describe "GET /show" do
    let (:book) { create(:book) }

    before do
      get "/books/#{book.id}"
      @body = JSON.parse(response.body)
    end

    it 'checks for the correct structure ' do
      expect(@body.keys).to contain_exactly(*expected_book_structure.keys)
    end

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST /create" do
    it "creates a book and returns correct structure" do
      expect {
        post "/books", params: { book: attributes_for(:book) }
      }.to change(Book, :count).by(1)

      body = JSON.parse(response.body)
      expect(body.keys).to contain_exactly(*expected_book_structure.keys)
      expect(response).to have_http_status(:success)
    end
  end

  describe "PUT /update" do
    let (:book) { create(:book) }

    before do
      put "/books/#{book.id}", params: { book: { title: "Updated Title" } }
      @body = JSON.parse(response.body)
    end

    it 'returns correct structure ' do
      expect(@body.keys).to contain_exactly(*expected_book_structure.keys)
    end

    it 'updates the title' do
      expect(Book.find(book.id).title).to eq('Updated Title')
    end

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end
  end

  describe "DELETE /destroy" do
    let!(:book) { create(:book) }

     it "deletes the book and returns success" do
      expect {
        delete "/books/#{book.id}"
      }.to change(Book, :count).by(-1)

      expect(response).to have_http_status(:success)
    end
  end
end