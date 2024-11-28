import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Song, SongGenre } from './song.model';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  private songs: Song[] = [
    {
      _id: 1,
      title: 'Happy Birthday',
      duration: '3:00',
      genre: SongGenre.Pop,
      artistName: 'Unknown',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      _id: 2,
      title: 'Yesterday',
      duration: '2:30',
      genre: SongGenre.Rock,
      artistName: 'The Beatles',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      _id: 3,
      title: 'Thriller',
      duration: '4:00',
      genre: SongGenre.HipHop,
      artistName: 'Michael Jackson',
      imageUrl: 'https://via.placeholder.com/150',
    },
  ];

  private songsSubject = new BehaviorSubject<Song[]>(this.songs);
  songs$ = this.songsSubject.asObservable();

  list(): Observable<Song[]> {
    return this.songs$;
  }

  read(id: number): Observable<Song | undefined> {
    const song = this.songs.find((s) => s._id === id);
    return new BehaviorSubject(song).asObservable();
  }

  getSongById(id: number): Song {
    console.log('getSongById aangeroepen');
    return this.songs.filter((song) => song._id === id)[0];
  }

  create(song: Song): void {
    console.log('Before Add song:', this.songs, song);
    const maxId = Math.max(...this.songs.map((s) => s._id), 0);
    song._id = maxId + 1;

    this.songs = [...this.songs, { ...song }];

    this.songsSubject.next(this.songs);
    console.log('After Add song:', this.songs);
  }

  update(updatedSong: Song): void {
    const index = this.songs.findIndex((s) => s._id === updatedSong._id);
    if (index !== -1) {
      this.songs[index] = updatedSong;
      this.songsSubject.next(this.songs);
    }
  }

  remove(id: number): void {
    this.songs = this.songs.filter((s) => s._id !== id);
    this.songsSubject.next(this.songs);
  }
}
