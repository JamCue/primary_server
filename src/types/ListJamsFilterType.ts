type ListJamsFilterType = {
  musicianId: string;
  when?: 'upcoming' | 'past';
  page: number;
  limit: number;
};

export default ListJamsFilterType;
