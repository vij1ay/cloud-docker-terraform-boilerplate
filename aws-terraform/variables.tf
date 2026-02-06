variable "aws_region" {
  default = "eu-central-1" # change if needed
}

variable "instance_type" {
  default = "t3.micro" # free tier
}

variable "key_name" {
  description = "Your AWS key pair name"
}

variable "project_name" {
  default = "docker-app"
}