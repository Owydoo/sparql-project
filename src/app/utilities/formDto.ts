export interface FormDto {
  category: string;
  artistName?: string;
  artistGenre?: string;
  artistInstrument?: string;
  artistLabel?: string;
  artistCountry?: string;
  artistAlbum? : string;
  artistTrack?:string;
  artistStatus?:string;
  albumName?: string;
  albumGenre?: string;
  albumArtistName?: string;
  albumLabel?: string;
  albumTrack?: string;
  trackName?: string;
  trackGenre?: string;
  trackAlbumName?: string;
  trackArtistName?: string;
  trackTypeOfTrack?: string;
  trackLabel?: string;
  limit?: number;
}

