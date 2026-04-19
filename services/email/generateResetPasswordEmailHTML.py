def generate_reset_password_email_html(reset_link: str) -> str:
    return f"""
    <html>
      <body style=\"font-family: Arial, sans-serif; line-height: 1.5; color: #111827;\">
        <h2>Password Reset Request</h2>
        <p>We received a request to reset your password.</p>
        <p>
          Click the button below to set a new password. This link will expire soon.
        </p>
        <p>
          <a
            href=\"{reset_link}\"
            style=\"display:inline-block;padding:10px 16px;background:#2563eb;color:#ffffff;text-decoration:none;border-radius:6px;\"
          >
            Reset Password
          </a>
        </p>
        <p>If you did not request this, you can safely ignore this email.</p>
      </body>
    </html>
    """
