import { HTTP_STATUS } from '#constants/httpStatus';
import { ApiError } from '#utils/ApiError';
import { asyncHandler } from '#utils/asyncHandler';
import { sendSuccess } from '#utils/apiResponse';
import { generateToken } from '#utils/generateToken';
import { User } from '#models/User.model';

export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(HTTP_STATUS.CONFLICT, 'Email is already registered');
  }

  const user = await User.create({ fullName, email, password, role });
  const token = generateToken(user._id);

  sendSuccess(res, {
    statusCode: HTTP_STATUS.CREATED,
    message: 'User registered successfully',
    data: { user, token },
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid credentials');
  }

  if (!user.isActive) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, 'Your account has been deactivated');
  }

  const token = generateToken(user._id);

  sendSuccess(res, {
    message: 'Login successful',
    data: { user, token },
  });
});

export const getMe = asyncHandler(async (req, res) => {
  sendSuccess(res, {
    message: 'Current user fetched successfully',
    data: { user: req.user },
  });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select('+password');

  if (!(await user.comparePassword(currentPassword))) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Current password is incorrect');
  }

  user.password = newPassword;
  await user.save();

  sendSuccess(res, { message: 'Password changed successfully' });
});
