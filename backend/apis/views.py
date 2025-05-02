# views.py
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import SignupSerializer
from .models import Task
from .serializers import TaskSerializer

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=username, password=password)
        
        if user is not None:
            # Create the JWT token
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            
            return Response({
                'access_token': access_token,
                'refresh_token': str(refresh)
            }, status=status.HTTP_200_OK)
        
        return Response({"detail": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST)


class SignupView(APIView):
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()  # User ko save kar diya
            return Response({"message": "Signup successful"}, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class Tasks(APIView):
    def get(self, request):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)  # Serialize karna
        return Response(serializer.data, status=status.HTTP_200_OK)  # Response return karna
    
    def post(self, request):
        serializer = TaskSerializer(data=request.data)  # Serializer ko data do
        if serializer.is_valid():  # Validate karo
            serializer.save()  # Save karo
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Success Response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Error Response