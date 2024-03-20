namespace DAL11440.Repository
{
    public interface IGenericRepository<T, D>
    {
        Task<IEnumerable<T>> GetAll();
        Task<T?> GetById(int id);
        Task<T> UpdateById(int id, D entity);
        Task DeleteById(int id);
        Task Create(D entity);
    }
}
