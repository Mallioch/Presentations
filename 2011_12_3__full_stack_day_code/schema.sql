USE [ToDoStuff]
GO

/****** Object:  Table [dbo].[Task]    Script Date: 12/03/2011 09:04:34 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Task]') AND type in (N'U'))
DROP TABLE [dbo].[Task]
GO

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[TaskType]') AND type in (N'U'))
DROP TABLE [dbo].[TaskType]
GO


USE [ToDoStuff]
GO

/****** Object:  Table [dbo].[Task]    Script Date: 12/03/2011 09:04:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Task](
	[TaskId] [int] PRIMARY KEY IDENTITY,
	[Description] [nvarchar](200) NOT NULL,
	[CreateDate] [datetime] NOT NULL DEFAULT(getdate())
) ON [PRIMARY]

GO

CREATE TABLE [dbo].[TaskType](
	[TaskTypeId] [int] NOT NULL,
	[TaskTypeName] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_TaskType] PRIMARY KEY CLUSTERED 
(
	[TaskTypeId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


INSERT INTO TaskType (TaskTypeId, TaskTypeName) VALUES (1, 'at home')
INSERT INTO TaskType (TaskTypeId, TaskTypeName) VALUES (2, 'at work')
INSERT INTO TaskType (TaskTypeId, TaskTypeName) VALUES (3, 'at the store')


/*
INSERT INTO Task (Description) VALUES ('foo')
UPDATE Task SET Description = 'go home' WHERE CreateDate = '2011-12-03 09:07:37.813'
DELETE FROM Task WHERE TaskId = 16
SELECT * FROM Task
*/