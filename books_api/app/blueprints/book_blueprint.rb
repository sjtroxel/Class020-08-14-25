# frozen_string_literal: true

class BookBlueprint < Blueprinter::Base
  identifier :id

  fields :title, :author, :read

  field :cover_image_url do |book|
    book.cover_image_url
  end

  view :normal do
    fields :title, :author, :read, :cover_image_url
  end
end