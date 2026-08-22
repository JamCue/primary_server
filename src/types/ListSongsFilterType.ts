type ListSongsFilterType = {
  musicianId: string;
  search?: string;
  key?: string;
  favorite?: boolean;
  sort: 'recent' | 'title';
  page: number;
  limit: number;
};

export default ListSongsFilterType;
