json.bench @bench, partial: 'api/benches/bench', as: :bench
json.reviews @bench.reviews, partial: 'api/reviews/review', as: :review
