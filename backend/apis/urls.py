# urls.py
from django.urls import path
from .views import LoginView , SignupView, Tasks

urlpatterns = [
    path('api/login', LoginView.as_view(), name='login'),  # For CBV
    path('api/signup', SignupView.as_view(), name='signup'),  # For CBV
    path('api/tasks', Tasks.as_view(), name='tasks'),  # For CBV
    # path('api/refresh', SignupView.as_view(), name='signup'),  # For CBV
]
