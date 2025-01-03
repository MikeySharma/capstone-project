public interface IAuthRepository
{
    Task<User> RegisterAsync(RegisterDto registerDto, HttpContext httpContext);
    Task<string> LoginAsync(LoginDto loginDto);
    Task<bool> ForgotPasswordAsync(string email);
    Task<bool> ResetPasswordAsync(ResetPasswordDto resetPasswordDto);
    Task<bool> VerifyOtpAsync(VerifyOtpDto verifyOtpDto);
}