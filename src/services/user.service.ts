import { UserRepository } from '@/repositories/user.repository';

class UserService {
    private userRepository = new UserRepository();

    async getUserInfo({ userId }: { userId: string }) {
        return this.userRepository.findById(userId);
    }
}

export default UserService;
