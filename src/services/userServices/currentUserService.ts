import { User } from '../../types';
import http from '../axiosCalls/base';
import backendRoutes from '../routes';

export const currentUserService = (): Promise<User> => http.get(backendRoutes.currentUserUrl)