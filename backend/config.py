import os
from typing import List

class Config:
    """Configuration class for the FastAPI backend"""
    
    # API Configuration
    API_TITLE = "VectorShift Flow Builder API"
    API_VERSION = "1.0.0"
    API_DESCRIPTION = "Backend API for the VectorShift Flow Builder application"
    
    # CORS Configuration
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]
    
    # Add additional CORS origins from environment variable
    cors_origins_env = os.getenv("CORS_ORIGINS")
    if cors_origins_env:
        CORS_ORIGINS.extend(cors_origins_env.split(","))
    
    CORS_ALLOW_CREDENTIALS = True
    CORS_ALLOW_METHODS = ["*"]
    CORS_ALLOW_HEADERS = ["*"]
    
    @classmethod
    def get_cors_origins(cls) -> List[str]:
        """Get CORS origins with environment variable support"""
        return cls.CORS_ORIGINS

# Create a config instance
config = Config() 