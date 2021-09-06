cmake_minimum_required(VERSION 3.10)

set(PROJECT_N <name>)
project(${PROJECT_N} VERSION 1.0)

set(CMAKE_C_STANDARD <version>)
set(CMAKE_C_STANDARD_REQUIRED True)

file(GLOB_RECURSE SRCS ${PROJECT_SOURCE_DIR}/src/*.c)
file(GLOB_RECURSE INCLUDES ${PROJECT_SOURCE_DIR}/include/*.h)

message(STATUS ${SRCS})
add_executable(${PROJECT_N} ${SRCS})

target_include_directories(${PROJECT_N} PUBLIC include)
