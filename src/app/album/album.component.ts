import { Component, OnInit } from '@angular/core';
import { Album } from './album.model';
import { AlbumService } from './album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  albums: Album[];
  newestAlbums: Album[];
  newestAlbumsId: number[] = [];
  images: Album[];
  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    this.albumService.getAlbums().subscribe(data => {
      this.albums = data;
      this.albums = this.albums.sort((a, b) => a.albumId < b.albumId ? 1 : -1);
      this.getThreeNewstAlbumsId();
      this.filterAlbums();

    });
  }

  getThreeNewstAlbumsId() {
    let current = this.albums[0].albumId;
    this.newestAlbumsId.push(current);
    for(let item of this.albums)
    {
      if(item.albumId != current ){ 
        current = item.albumId;
        this.newestAlbumsId.push(current);
        if(this.newestAlbumsId.length == 3)
          break;
      }
    }
  }

  filterAlbums() {
    this.newestAlbums = this.albums.filter(x =>  this.newestAlbumsId.indexOf(x.albumId)>-1).filter((elem1, pos, arr) => arr.findIndex((elem2)=>elem2.albumId === elem1.albumId) === pos);
  }



  showImages(albumId: number) {
    this.images = this.albums.filter( x => x.albumId == albumId).sort((a, b) => a.id < b.id ? 1 : -1).slice(0,2);
  }
}
