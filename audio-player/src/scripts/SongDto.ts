export default interface SongDto {
  readonly id: number;
  readonly fileName: string;
  readonly songName: string;
  readonly desc: string;
  readonly infosUrl: string;
  readonly artistId: number;
}
