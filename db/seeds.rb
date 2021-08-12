# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# CREATING GENRES
genres = Genre.create([{title: 'Horror'}, {title: 'Action'}, {title: 'Science Fiction'}])

# CREATING MOVIES 
horror_movies = Movie.create([{title: 'Us', rating: 'R', language: 'English', director: 'Jordan Peele', producer: 'Jordan Peele, Sean McKittrick, Jason Blum, Ian Cooper', writer: 'Jordan Peele', release: 'Mar 22, 2019', sales: '$175 Million', runtime: '1h 56m', genre: Genre.all[0]}, {title: 'Get Out', rating: 'R', language: 'English', director: 'Jordan Peele', producer: 'Jordan Peele, Sean McKittrick, Jason Blum, Ted Hamm', writer: 'Jordan Peele', release: 'Feb 24, 2017', sales: '$176 Million', runtime: '1h 44m', genre: Genre.all[0]},{title: 'Shaun of the Dead', rating: 'R', language: 'English', director: 'Edgar Wright', producer: 'Nira Park', writer: 'Simon Pegg, Edgar Wright', release: 'Jul 23, 2013', sales: '$13.5 Million', runtime: '1h 37m', genre: Genre.all[0]}])


action_movies = Movie.create([{title: 'Die Hard', rating: 'R', language: 'English', director: 'Director W', producer: 'Producer W', writer: 'Writer W', release: 'Mar 4, 2021', sales: '$175 Million', runtime: '1h 56m', genre: Genre.all[1]}, {title: 'Predator', rating: 'R', language: 'English', director: 'Writer X', producer: 'Producer X', writer: 'Writer X', release: 'Feb 4, 2012', sales: '$176 Million', runtime: '1h 44m', genre: Genre.all[1]},{title: 'True Lies', rating: 'R', language: 'English', director: 'Director Y', producer: 'Producer Y', writer: 'Writer Y', release: 'Jul 23, 1989', sales: '$13.5 Million', runtime: '1h 37m', genre: Genre.all[1]}])

scifi_movies = Movie.create([{title: 'Prometheus', rating: 'R', language: 'English', director: 'Director Z', producer: 'Producer Z', writer: 'Writer Z', release: 'Mar 22, 2019', sales: '$175 Million', runtime: '1h 56m', genre: Genre.all[2]}, {title: 'Alien', rating: 'R', language: 'English', director: 'Director A', producer: 'Producer A', writer: 'Writer A', release: 'Feb 2, 2000', sales: '$176 Million', runtime: '1h 44m', genre: Genre.all[2]},{title: 'Riddick', rating: 'R', language: 'English', director: 'Director B', producer: 'Producer B', writer: 'Writer B', release: 'Jul 3, 2002', sales: '$13.5 Million', runtime: '1h 37m', genre: Genre.all[2]}])



#CREATING POSTERS 
posters = Poster.create([{lynk: 'https://myproject-images.s3.us-east-2.amazonaws.com/Us1_.png', votes: 0, movie: Movie.all[0]}, {lynk: 'https://myproject-images.s3.us-east-2.amazonaws.com/Us2_.png', votes: 0, movie: Movie.all[0]}, {lynk: 'https://myproject-images.s3.us-east-2.amazonaws.com/Us3_.png', votes: 0, movie: Movie.all[0]}, {lynk: 'https://myproject-images.s3.us-east-2.amazonaws.com/GetOut1_.png', votes: 0, movie: Movie.all[0]}, {lynk: 'https://myproject-images.s3.us-east-2.amazonaws.com/GetOut2.png', votes: 0, movie: Movie.all[0]}, {lynk: 'https://s3.console.aws.amazon.com/s3/buckets/myproject-images?region=us-east-2&tab=objects', votes: 0, movie: Movie.all[1]}, {lynk: 'https://myproject-images.s3.us-east-2.amazonaws.com/ShaunOfTheDead1.png', votes: 0, movie: Movie.all[2]}, {lynk: 'https://myproject-images.s3.us-east-2.amazonaws.com/ShaunOfTheDead2.png', votes: 0, movie: Movie.all[2]}, {lynk: 'https://myproject-images.s3.us-east-2.amazonaws.com/ShaunOfTheDead3.png', votes: 0, movie: Movie.all[2]}])




#SEED CONFIRMATION
puts "Seed Successful"