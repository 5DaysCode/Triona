

public class UserService : IUserService{


    private readonly IUserRepository _userRepository;
    
     public UserService(IUserRepository  userRepository) {
      this._userRepository = userRepository; 

     }

    public async Task AddUserAsync(User user)
    {
         await _userRepository.AddUserAsync(user);
    }

    public async Task DeleteUserAsync(int id)
    { 
         await  _userRepository.DeleteUserAsync(id);
    }

    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        return await _userRepository.GetAllUserAsync();
    }

    public async Task<User> GetUserByIdAsync(int id)
    {
         return await _userRepository.GetUserByIdAsync(id);
    }

    public async Task UpdateUserAsync(User user)
    {
          await _userRepository.UpdateUserAsync(user);
    }
}